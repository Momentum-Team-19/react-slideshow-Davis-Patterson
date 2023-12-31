import { useState, useEffect } from 'react';
import Progress from 'components/Progress';
import Checkboxes from 'components/Checkboxes';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// create another parent component to hold onto preferences, then pass them down as props
// called 'lifting state up' (into a parent)

const FilmCard = ({
  film,
  toggleFavorite,
  favorites,
  progress,
  setProgress,
  fade,
}) => {
  const [isFilmTitle, setIsFilmTitle] = useLocalStorage('isFilmTitle', true);
  const [isFilmBan, setIsFilmBan] = useLocalStorage('isFilmBan', true);
  const [isFilmImg, setIsFilmImg] = useLocalStorage('isFilmImg', true);
  const [isFilmJa, setIsFilmJa] = useLocalStorage('isFilmJa', true);
  const [isFilmDate, setIsFilmDate] = useLocalStorage('isFilmDate', true);
  const [isFilmDir, setIsFilmDir] = useLocalStorage('isFilmDir', true);
  const [isFilmProd, setIsFilmProd] = useLocalStorage('isFilmProd', true);
  const [isFilmDesc, setIsFilmDesc] = useLocalStorage('isFilmDesc', true);
  const [isFilmDur, setIsFilmDur] = useLocalStorage('isFilmDur', true);
  const [isFilmRat, setIsFilmRat] = useLocalStorage('isFilmRat', true);
  const [isFilmUrl, setIsFilmUrl] = useLocalStorage('isFilmUrl', true);
  const [isAllChecked, setIsAllChecked] = useLocalStorage('isAllChecked', true);
  const isFavorite = favorites.some(
    (favoriteFilm) => favoriteFilm.title === film.title
  );

  const handleAllCheckboxChange = () => {
    setIsAllChecked(!isAllChecked);
  };

  useEffect(() => {
    setIsFilmTitle(isAllChecked);
    setIsFilmBan(isAllChecked);
    setIsFilmImg(isAllChecked);
    setIsFilmJa(isAllChecked);
    setIsFilmDate(isAllChecked);
    setIsFilmDir(isAllChecked);
    setIsFilmProd(isAllChecked);
    setIsFilmDesc(isAllChecked);
    setIsFilmDur(isAllChecked);
    setIsFilmRat(isAllChecked);
    setIsFilmUrl(isAllChecked);
  }, [isAllChecked]);

  return (
    <>
      <div className='container'>
        <div className='slideContainer'>
          {isFilmTitle ? <h2 className='filmTitle'>{film.title}</h2> : null}
          <div className={`infoBox ${fade}`}>
            {isFilmBan ? (
              <div className='shadow'>
                <img
                  src={film.movie_banner}
                  alt={film.title}
                  className='filmBanner'
                ></img>
              </div>
            ) : null}
            <div className='favToggle' onClick={() => toggleFavorite(film)}>
              {isFavorite ? '♥' : '♡'}
            </div>
            {isFilmImg ? (
              <div className='imgBox'>
                <img
                  src={film.image}
                  alt={film.title}
                  className='filmImg'
                ></img>
              </div>
            ) : null}
            <div className='detailBox'>
              {isFilmJa ? (
                <p className='filmJapanese'>{film.original_title}</p>
              ) : null}
              {isFilmJa ? (
                <p className='titleRomanised'>
                  "{film.original_title_romanised}"
                </p>
              ) : null}
              {isFilmDate ? (
                <p className='filmDate'>{film.release_date}</p>
              ) : null}
              <div className='directorContainer'>
                {isFilmDir ? (
                  <div className='directorBox'>
                    <p className='filmDirector'>
                      <strong>Director:</strong> {film.director}
                    </p>
                  </div>
                ) : null}
                {isFilmProd ? (
                  <div className='producerBox'>
                    <p className='filmProducer'>
                      <strong>Producer:</strong> {film.producer}
                    </p>
                  </div>
                ) : null}
              </div>
              {isFilmDesc ? (
                <p className='filmDesc'>{film.description}</p>
              ) : null}
              <div className='extraInfoContainer'>
                <div className='extraInfoBox'>
                  {isFilmDur ? (
                    <p className='filmTime'>⏳ {film.running_time} mins</p>
                  ) : null}
                  {isFilmRat ? (
                    <p className='rtScore'>🍅 {film.rt_score}%</p>
                  ) : null}
                </div>
              </div>
              {isFilmUrl ? (
                <div className='urlBox'>
                  <a className='filmUrl' href={film.url} alt={film.title}>
                    Click to see film page
                  </a>
                </div>
              ) : null}
            </div>
            <Progress progress={progress} setProgress={setProgress} />
          </div>
        </div>
        <Checkboxes
          isFilmTitle={isFilmTitle}
          setIsFilmTitle={setIsFilmTitle}
          isFilmBan={isFilmBan}
          setIsFilmBan={setIsFilmBan}
          isFilmImg={isFilmImg}
          setIsFilmImg={setIsFilmImg}
          isFilmJa={isFilmJa}
          setIsFilmJa={setIsFilmJa}
          isFilmDate={isFilmDate}
          setIsFilmDate={setIsFilmDate}
          isFilmDir={isFilmDir}
          setIsFilmDir={setIsFilmDir}
          isFilmProd={isFilmProd}
          setIsFilmProd={setIsFilmProd}
          isFilmDesc={isFilmDesc}
          setIsFilmDesc={setIsFilmDesc}
          isFilmDur={isFilmDur}
          setIsFilmDur={setIsFilmDur}
          isFilmRat={isFilmRat}
          setIsFilmRat={setIsFilmRat}
          isFilmUrl={isFilmUrl}
          setIsFilmUrl={setIsFilmUrl}
          isAllChecked={isAllChecked}
          handleAllCheckboxChange={handleAllCheckboxChange}
        />
      </div>
    </>
  );
};

export default FilmCard;
