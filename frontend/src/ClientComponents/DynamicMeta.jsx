import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const DynamicMetaTags = () => {
    const [metaData, setMetaData] = useState({});
    const [googleSettings, setGoogleSettings] = useState({});
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch metadata for current page
                const [
                    dataResponse,
                    productResponse,
                    productCategoryResponse,
                    newsResponse,
                    newsCategoryResponse,
                ] = await Promise.all([
                    axios.get(`/api/sitemap/fetchSitemaps`, { withCredentials: true }),
                    axios.get(`/api/product/fetchUrlmeta`, { withCredentials: true }),
                    axios.get(`/api/product/fetchCategoryUrlmeta`, { withCredentials: true }),
                    axios.get(`/api/news/fetchUrlmeta`, { withCredentials: true }),
                    axios.get(`/api/news/fetchCategoryUrlmeta`, { withCredentials: true }),
                ]);

                const allResponses = [
                    ...(dataResponse?.data || []),
                    ...(productResponse?.data || []),
                    ...(productCategoryResponse?.data || []),
                    ...(newsResponse?.data || []),
                    ...(newsCategoryResponse?.data || []),
                ];

                const currentUrl = window.location.href;

                const matchedMeta = allResponses.find(
                    (item) => item.url === currentUrl
                );

                if (matchedMeta) {
                    setMetaData({
                        title: matchedMeta.metatitle,
                        description: matchedMeta.metadescription,
                        canonical: matchedMeta.metacanonical,
                        keywords: matchedMeta.metakeywords,
                        language: matchedMeta.metalanguage,
                        otherMeta: matchedMeta.otherMeta,
                        schema: matchedMeta.metaschema,
                    });
                } else {
                    console.warn('No matching metadata found for this URL.');
                }

                // Fetch Google settings
                const googleResponse = await axios.get('/api/googlesettings/getGoogleSettings');
                setGoogleSettings(googleResponse.data || '');

            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        };

        fetchData();
    }, [location]);

    useEffect(() => {
        if (googleSettings) {
            if (googleSettings.headerscript) {
                const headerScript = document.createElement('script');
                headerScript.type = 'text/javascript';
                headerScript.text = googleSettings.headerscript;
                document.head.appendChild(headerScript);
            }

            if (googleSettings.bodyscript) {
                const bodyScript = document.createElement('script');
                bodyScript.type = 'text/javascript';
                bodyScript.text = googleSettings.bodyscript;
                document.body.appendChild(bodyScript);
            }
        }

        if (googleSettings.bodyscript) {
            // Check if body script already exists
            const existingBodyScript = document.querySelector('script[data-type="body"]');
            if (existingBodyScript) {
                document.body.removeChild(existingBodyScript);
            }

            const bodyScript = document.createElement('script');
            bodyScript.type = 'text/javascript';
            bodyScript.dataset.type = 'body'; 
            bodyScript.text = googleSettings.bodyscript;
            document.body.appendChild(bodyScript);
        }

        // Cleanup on unmount
        return () => {
            if (metaData.otherMeta) {
                const metaTags = new DOMParser().parseFromString(metaData.otherMeta, 'text/html').head.querySelectorAll('meta');
                metaTags.forEach((meta) => {
                    const name = meta.getAttribute('name');
                    if (name) {
                        const metaElement = document.querySelector(`meta[name="${name}"]`);
                        if (metaElement) {
                            document.head.removeChild(metaElement);
                        }
                    }
                });
            }

            const existingSchema = document.querySelector('script[type="application/ld+json"]');
            if (existingSchema) {
                document.head.removeChild(existingSchema);
            }
        };
    }, [metaData]);

    useEffect(() => {
        if (googleSettings.headerscript) {
            // Inject header script into <head>
            const headerScript = document.createElement('script');
            headerScript.type = 'text/javascript';
            headerScript.text = googleSettings.headerscript;
            document.head.appendChild(headerScript);
        }

        if (googleSettings.bodyscript) {
            // Inject body script into <body>
            const bodyScript = document.createElement('script');
            bodyScript.type = 'text/javascript';
            bodyScript.text = googleSettings.bodyscript;
            document.body.appendChild(bodyScript);
        }

        // Cleanup on unmount
        return () => {
            if (googleSettings.headerscript) {
                const existingHeaderScript = document.querySelector(`script[type="text/javascript"][data-header="true"]`);
                if (existingHeaderScript) {
                    document.head.removeChild(existingHeaderScript);
                }
            }

            if (googleSettings.bodyscript) {
                const existingBodyScript = document.querySelector(`script[type="text/javascript"][data-body="true"]`);
                if (existingBodyScript) {
                    document.body.removeChild(existingBodyScript);
                }
            }
        };
    }, [googleSettings]);

    return (
        <>
            <Helmet>
                <title>{metaData.title}</title>
                <meta name="description" content={metaData.description} />
                <link rel="canonical" href={metaData.canonical || window.location.href} />
                <meta name="keywords" content={metaData.keywords} />
                <meta httpEquiv="Content-Language" content={metaData.language} />
            </Helmet>
        </>
    );
};

export default DynamicMetaTags;
