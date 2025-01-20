import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMetaDetails = () => {
  const { id: metaId, type } = useParams();
  const navigate = useNavigate();

  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetadescription] = useState("");
  const [metakeywords, setMetakeywords] = useState("");
  const [metalanguage, setMetalanguage] = useState("");
  const [metacanonical, setMetacanonical] = useState("");
  const [metaschema, setMetaschema] = useState("");
  const [otherMeta, setOtherMeta] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchMetaDetailsData = async () => {
      try {
        let response;
        switch (type) {
          case 'product-category':
            response = await axios.get(`
/api/product/fetchCategoryUrlmetaById?id=${metaId}`, { withCredentials: true });
            break;
          case 'products':
            response = await axios.get(`
/api/product/fetchUrlmetaById?id=${metaId}`, { withCredentials: true });
            break;
          case 'news-category':
            response = await axios.get(`
/api/news/fetchCategoryUrlmetaById?id=${metaId}`, { withCredentials: true });
            break;
          case 'new':
            response = await axios.get(`
/api/news/fetchUrlmetaById?id=${metaId}`, { withCredentials: true });
            break;
          case 'data':
            response = await axios.get(`
/api/sitemap/fetchSitemapById?id=${metaId}`);
            break;
          default:
            throw new Error('Invalid type');
        }

        const { url, metatitle, metadescription, metakeywords, metalanguage, metacanonical, metaschema, otherMeta } = response.data;
        setUrl(url);
        setMetatitle(metatitle);
        setMetadescription(metadescription);
        setMetakeywords(metakeywords);
        setMetalanguage(metalanguage);
        setMetacanonical(metacanonical);
        setMetaschema(metaschema);
        setOtherMeta(otherMeta);

      } catch (error) {
        console.error('Error fetching meta details data:', error);
      }
    };
    fetchMetaDetailsData();
  }, [metaId, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const metaDetailsData = {
        url,
        metatitle,
        metadescription,
        metakeywords,
        metalanguage,
        metacanonical,
        metaschema,
        otherMeta
      };

      let endpoint;
      switch (type) {
        case 'product-category':
          endpoint = `
/api/product/editCategoryUrlmeta?id=${metaId}`;
          break;
        case 'products':
          endpoint = `
/api/product/editUrlmeta?id=${metaId}`;
          break;
        case 'news-category':
          endpoint = `
/api/news/editCategoryUrlmeta?id=${metaId}`;
          break;
        case 'new':
          endpoint = `
/api/news/editUrlmeta?id=${metaId}`;
          break;
        case 'data':
          endpoint = `
/api/sitemap/updateSitemapById?id=${metaId}`;
          break;
        default:
          throw new Error('Invalid type');
      }

      await axios.put(endpoint, metaDetailsData, { withCredentials: true });
      navigate('/metadetails');
    } catch (error) {
      console.error('Error updating meta details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="url" className="block font-semibold mb-2">
          URL
        </label>
        <input
          disabled
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metatitle" className="block font-semibold mb-2">
          Meta Title
        </label>
        <textarea
          id="metatitle"
          value={metatitle}
          onChange={(e) => setMetatitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metadescription" className="block font-semibold mb-2">
          Meta Description
        </label>
        <textarea
          id="metadescription"
          value={metadescription}
          onChange={(e) => setMetadescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metakeywords" className="block font-semibold mb-2">
          Meta Keywords
        </label>
        <textarea
          id="metakeywords"
          value={metakeywords}
          onChange={(e) => setMetakeywords(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metacanonical" className="block font-semibold mb-2">
          Meta Canonical
        </label>
        <textarea
          id="metacanonical"
          value={metacanonical}
          onChange={(e) => setMetacanonical(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metalanguage" className="block font-semibold mb-2">
          Meta Language
        </label>
        <textarea
          id="metalanguage"
          value={metalanguage}
          onChange={(e) => setMetalanguage(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="otherMeta" className="block font-semibold mb-2">
          Other Meta
        </label>
        <textarea
          id="otherMeta"
          value={otherMeta}
          onChange={(e) => setOtherMeta(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metaschema" className="block font-semibold mb-2">
          Schema
        </label>
        <textarea
          id="metaschema"
          value={metaschema}
          onChange={(e) => setMetaschema(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Meta
      </button>
    </form>
  );
};

export default EditMetaDetails;
