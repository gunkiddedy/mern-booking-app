import useFetch from "../../hooks/useFetch"
import "./featuredProperties.css"

const Photo = ({item, alt}) => {
  return (
    <img src={ item } alt={ alt } className="fpImg" />
  )
}

const FeaturedProperties = () => {
  const URL = 'http://localhost:8800/api/hotelss?featured=true&limit=3'
  const defaultImg = 'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o='

  const { data, loading, error } = useFetch(URL)

  // console.log('FeaturedProperties', data)

  return (
    <div className="fp">
      { loading ? 'Please wait...' : <>
        {data?.map((item, index) => (
          <div className="fpItem" key={index}>
            { 
              item.photos.length 
              ? <Photo item={item.photos[0]} alt={item.name} /> 
              : <Photo item={ defaultImg } alt="default image" /> 
            }
            <span className="fpName">{ item.name }</span>
            <span className="fpCity">{ item.city }</span>
            <span className="fpPrice">Starting from ${ item.cheapestPrice } </span>
            <div className="fpRating">
              <button>{ item.rating ? item.rating : '0' }</button>
              <span>Excellent</span>
            </div>
          </div>
        ))}
      </> }
      {/* <span className="error" style={{color: 'red'}}>{ error ? error.message : null }</span> */}
      { error && <span className="error" style={{color: 'red'}}>{ error?.message }</span> }
    </div>
  )
}

export default FeaturedProperties
