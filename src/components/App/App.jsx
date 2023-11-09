import { useState, useEffect } from "react";
import { fetchImages } from "api/fetchImages";
import { Notify } from "notiflix";
import { createPortal } from "react-dom";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Body } from "./App.styled";



export const App = () => {
  const [ searchName, setSearchName ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    // Перевіряємо наявність елемента 'loader-root' при завантаженні компонента
    const loaderElement = document.getElementById('loader-root');
    if (!loaderElement) {
      // Якщо елемент не існує, створюємо його
      const newLoaderElement = document.createElement('div');
      newLoaderElement.setAttribute('id', 'loader-root');
      // Тут ви можете встановити стилі або класи за необхідності
      document.body.appendChild(newLoaderElement);
    }
  }, []);
 
  useEffect(() => {

    if ( searchName === '' ) {
      return;
    }
  

    const getImages = async () => {

      try {

        setLoading(true);


        const searchImages = await fetchImages(searchName, page);
        setTotal (searchImages.totalHits)

        if (!searchImages || !searchImages.hits) {
            Notify.failure(`Sorry, the images you requested: ${searchName} not found.`);
            return;
        }

        if (searchImages.length === 0) {
          Notify.failure(
            `Sorry, the images you requested: ${searchName} not found.`
          );
        };

        setImages(prev => [ ...prev, ...searchImages.hits ])
          

      } catch (error) {
        Notify.failure('Something went wrong');

      } finally {
        setLoading(false);
      }
    };
    
    getImages();
    
  }, [ searchName, page ]);
  

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setImages([]);
    setPage(1);
  };


  const loadMoreSubmit = () => {
    setPage( prev => prev + 1 );
  };

  const totalPage = total / images.length;
    return (
      <Body>
          <Searchbar onSubmit = { handleFormSubmit }/>
          { images.length!==0 && (<ImageGallery images = { images } />) }
          { totalPage > 1 && !loading && images.length > 0 && <Button onClick={loadMoreSubmit} /> }
          { loading && createPortal( <Loader />,  document.getElementById('loader-root')) }  
      </Body>
    );
};