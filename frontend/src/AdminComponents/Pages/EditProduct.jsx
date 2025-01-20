import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProductForm = () => {
    const [title, setTitle] = useState("");
    const [homeDetail, sethomeDetail] = useState("");
    const [details, setDetails] = useState("");
    const [photo, setPhoto] = useState([]);
    const [slug, setSlug] = useState("");
    const [metatitle, setMetatitle] = useState("");
    const [metadescription, setMetadescription] = useState("");
    const [metakeywords, setMetakeywords] = useState("");
    const [metalanguage, setMetalanguage] = useState("")
    const [metacanonical, setMetacanonical] = useState("")
    const [metaschema, setMetaschema] = useState("")
    const [otherMeta, setOthermeta] = useState("")
    const [status, setStatus] = useState("active");
    const [categories, setCategories] = useState([]);
    const [parentCategoryId, setParentCategoryId] = useState("");
    const { slugs } = useParams();
    const [initialPhotos, setInitialPhotos] = useState([]);
    const [photoAlts, setPhotoAlts] = useState([]);
    const [url, setUrl] = useState()
    const [changeFreq, setChangeFreq] = useState()
    const [imgTitle, setImgTitle] = useState([]);
    const [initialImgTitle, setInitialImgTitle] = useState([]);
    const [priority, setPriority] = useState()
    const [initialphotoAlts, setInitialPhotoAlts] = useState([]);
    const [catalogue, setCatalogue] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []);

    const fetchProduct = async () => {
        try {
            const productResponse = await axios.get(`/api/product/getSingleProduct?slugs=${slugs}`, { withCredentials: true });
            const product = productResponse.data;
            setTitle(product.title);
            sethomeDetail(product.homeDetail)
            setDetails(product.details);
            setInitialPhotos(product.photo);
            setStatus(product.status);
            setInitialPhotoAlts(product.alt);
            setInitialImgTitle(product.imgTitle);
            setSlug(product.slug);
            setMetatitle(product.metatitle);
            setMetadescription(product.metadescription)
            setMetakeywords(product.metakeywords);
            setMetalanguage(product.metalanguage);
            setMetacanonical(product.metacanonical);
            setMetaschema(product.metaschema);
            setOthermeta(product.otherMeta);
            product.url ? setUrl(product.url) : setUrl(`https://demo.rndtechnosoft.com/product/${product.slug}`)
            setChangeFreq(product.changeFreq)
            setPriority(product.priority)
            setCatalogue(product.catalogue)
            const categoryResponse = await axios.get(`/api/product/getSpecificCategory?categoryId=${product.categories}`, { withCredentials: true });
            const category = categoryResponse.data;
            setParentCategoryId(category.slug);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/product/getAll', { withCredentials: true });
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('homeDetail',homeDetail)
            formData.append('details', details);
            formData.append('status', status);
            formData.append('slug', slug);
            formData.append('metatitle', metatitle);
            formData.append('metakeywords', metakeywords);
            formData.append('metadescription', metadescription);
            formData.append('metalanguage', metalanguage);
            formData.append('metacanonical', metacanonical);
            formData.append('metaschema', metaschema);
            formData.append('otherMeta', otherMeta);
            formData.append('url', url);
            formData.append('changeFreq', changeFreq);
            formData.append('priority', priority);
            formData.append('categories', parentCategoryId);
            formData.append('catalogue', catalogue);

            // Combine initial and new photo alts into a single array
            const combinedAlts = [...initialphotoAlts, ...photoAlts];
            const combinedImgTitles = [...initialImgTitle, ...imgTitle];

            // Append photos and their respective alts to FormData
            photo.forEach((p) => {
                formData.append('photo', p);
            });

            combinedAlts.forEach((a) => {
                formData.append('alt', a);
            });

            combinedImgTitles.forEach((a) => {
                formData.append('imgTitle', a);
            });

            const response = await axios.put(`/api/product/updateProduct?slugs=${slugs}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            navigate('/product');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        const newPhotos = Array.from(e.target.files);
        setPhoto([...photo, ...newPhotos]);
    };

    const handleInitialAltTextChange = (e, index) => {
        const newPhotoAlts = [...initialphotoAlts];
        newPhotoAlts[index] = e.target.value;
        setInitialPhotoAlts(newPhotoAlts);
    };

    const handleNewAltTextChange = (e, index) => {
        const newPhotoAlts = [...photoAlts];
        newPhotoAlts[index] = e.target.value;
        setPhotoAlts(newPhotoAlts);
    };

    const handleInitialImgTitleChange = (e, index) => {
        const newImgTitles = [...initialImgTitle];
        newImgTitles[index] = e.target.value;
        setInitialImgTitle(newImgTitles);
    };

    const handleNewImgTitleChange = (e, index) => {
        const newImgTitles = [...imgTitle];
        newImgTitles[index] = e.target.value;
        setImgTitle(newImgTitles);
    };



    const handleDeleteInitialPhoto = (e, photoFilename, index) => {
        e.preventDefault();
        axios.delete(`/api/product/${slugs}/image/${photoFilename}/${index}`, { withCredentials: true })
            .then(response => {
                const updatedPhotos = initialPhotos.filter(photo => photo !== photoFilename);
                setInitialPhotos(updatedPhotos);
                const updatedPhotoAlts = [...initialphotoAlts];
                const updatedimgTitle = [...initialImgTitle]
                updatedimgTitle.splice(index, 1);
                updatedPhotoAlts.splice(index, 1);
                setInitialPhotoAlts(updatedPhotoAlts);
                setInitialImgTitle(updatedimgTitle);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteNewPhoto = (e, index) => {
        e.preventDefault();
        const updatedPhotos = [...photo];
        updatedPhotos.splice(index, 1);
        setPhoto(updatedPhotos);
        const updatedPhotoAlts = [...photoAlts];
        const updatedimgTitle = [...imgTitle];
        updatedPhotoAlts.splice(index, 1);
        updatedimgTitle.splice(index, 1)
        setPhotoAlts(updatedPhotoAlts);
        setImgTitle(updatedimgTitle);
    };



    const renderCategoryOptions = (category) => {
        return (
            <option key={category._id} value={category.slug} selected={parentCategoryId === category._id}>
                {category.category}
            </option>
        );
    };

    const handleParentCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setParentCategoryId(selectedCategoryId);
    };



    const modules = {
        toolbar: [
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    useEffect(() => {
        if (slug) {
            setUrl(`https://demo.rndtechnosoft.com/product/${slug}`);
        }
    }, [slug]);

    useEffect(() => {
        setSlug(title)
    }, [title]);

    useEffect(() => {
        setSlug(slug.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9\s]/g, '-').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
        );
    }, [slug]);

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Product</h1>
            <div className="mb-4">
                <label htmlFor="parentCategory" className="block font-semibold mb-2">
                    Parent Category
                </label>
                <select
                    id="parentCategory"
                    value={parentCategoryId}
                    onChange={handleParentCategoryChange}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                >
                    <option value="">Select Parent Category</option>
                    {categories.map(renderCategoryOptions)}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="homePageDetail" className="block font-semibold mb-2">
                    Home Page Details
                </label>
                <ReactQuill
                    id="homePageDetail"
                    value={homeDetail}
                    onChange={(value) => sethomeDetail(value)}
                    modules={modules}
                    className="border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="details" className="block font-semibold mb-2">
                    Description
                </label>
                <ReactQuill
                    id="details"
                    value={details}
                    onChange={(value) => setDetails(value)}
                    modules={modules}
                    className="border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Current Photos</label>
                <div className="flex flex-wrap gap-4">
                    {initialPhotos.map((photo, index) => (
                        <div key={index} className="relative w-56">
                            <img
                                src={`/api/image/download/${photo}`}
                                alt={`Photo ${index + 1}`}
                                className="w-56 h-32 object-cover"
                            />
                            <label htmlFor={`alt-${index}`} className="block mt-2">
                                Alternative Text:
                                <input
                                    type="text"
                                    id={`alt-${index}`}
                                    value={initialphotoAlts[index]}
                                    onChange={(e) => handleInitialAltTextChange(e, index)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                />
                            </label>
                            <label htmlFor={`imgTitle-${index}`} className="block mt-2">
                                Image Title:
                                <input
                                    type="text"
                                    id={`imgTitle-${index}`}
                                    value={initialImgTitle[index]}
                                    onChange={(e) => handleInitialImgTitleChange(e, index)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                />
                            </label>
                            <button
                                onClick={(e) => handleDeleteInitialPhoto(e, photo, index)}
                                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center"
                            >
                                <span className="text-xs">X</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Add New Photos</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="p-2 border rounded"
                />
                <div className="flex flex-wrap gap-4 mt-4">
                    {photo.map((file, index) => (
                        <div key={index} className="relative w-56">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`New Photo ${index + 1}`}
                                className="w-56 h-32 object-cover"
                            />

                            <label htmlFor={`alt-new-${index}`} className="block mt-2">
                                Alternative Text:
                                <input
                                    type="text"
                                    id={`alt-new-${index}`}
                                    value={photoAlts[index] || ""}
                                    onChange={(e) => handleNewAltTextChange(e, index)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                />
                            </label>
                            <label htmlFor={`imgTitle-new-${index}`} className="block mt-2">
                                Image Title:
                                <input
                                    type="text"
                                    id={`imgTitle-new-${index}`}
                                    value={imgTitle[index] || ""}
                                    onChange={(e) => handleNewImgTitleChange(e, index)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                />
                            </label>
                            <button
                                onClick={(e) => handleDeleteNewPhoto(e, index)}
                                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center"
                            >
                                <span className="text-xs">X</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="catalogue" className="block font-semibold mb-2">Upload Catalogue</label>
                <input
                    type="file"
                    id="catalogue"
                    onChange={(e) => { console.log(e.target.files[0]); setCatalogue(e.target.files[0]) }}
                    className="border rounded focus:outline-none"
                    accept=".pdf,.doc,.docx"
                />
            </div>
            <div className="mb-4 mt-4">
                <label htmlFor="slug" className="block font-semibold mb-2">
                    Slug
                </label>
                <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="url" className="block font-semibold mb-2">
                    URL
                </label>
                <input
                    disabled
                    type="url"
                    id="url"
                    value={`https://demo.rndtechnosoft.com/product/${slug}`}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="meta" className="block font-semibold mb-2">
                    Meta Title
                </label>
                <textarea
                    id="meta"
                    value={metatitle}
                    onChange={(e) => setMetatitle(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="meta" className="block font-semibold mb-2">
                    Meta Description
                </label>
                <textarea
                    id="meta"
                    value={metadescription}
                    onChange={(e) => setMetadescription(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="meta" className="block font-semibold mb-2">
                    Meta Keywords
                </label>
                <textarea
                    id="meta"
                    value={metakeywords}
                    onChange={(e) => setMetakeywords(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="meta" className="block font-semibold mb-2">
                    Meta Canonical
                </label>
                <textarea
                    id="meta"
                    value={metacanonical}
                    onChange={(e) => setMetacanonical(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="meta" className="block font-semibold mb-2">
                    Meta Language
                </label>
                <textarea
                    id="meta"
                    value={metalanguage}
                    onChange={(e) => setMetalanguage(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="meta" className="block font-semibold mb-2">
                    Other Meta
                </label>
                <textarea
                    id="meta"
                    value={otherMeta}
                    onChange={(e) => setOthermeta(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="meta" className="block font-semibold mb-2">
                    Schema
                </label>
                <textarea
                    id="meta"
                    value={metaschema}
                    onChange={(e) => setMetaschema(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="3"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="priority" className="block font-semibold mb-2">
                    Priority
                </label>
                <input
                    type="number"
                    id="priority"
                    min={0}
                    max={1}
                    step={0.01}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="changeFreq" className="block font-semibold mb-2">
                    Change Frequency
                </label>
                <select
                    id="changeFreq"
                    value={changeFreq}
                    onChange={(e) => setChangeFreq(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                >
                    <option value="">Select Change Frequency</option>
                    <option value="always">Always</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="status" className="block font-semibold mb-2">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
                Update Product
            </button>
        </form>
    );
};

export default EditProductForm;
