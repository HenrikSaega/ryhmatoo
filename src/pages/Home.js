import { useNavigate } from "react-router-dom"
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="title-container">
        <h1 className="title col-md-12">GET-Recipe 🍽️</h1>
      </div>
      <div className="row justify-content-center">
        <div className="buttons-container col-12 col-md-8">
          <button className="btn button mx-2 mt-5" onClick={() => navigate('/search')}>
            Search Recipes
          </button>
          <button className="btn button mx-3 mt-5" onClick={() => navigate('/saved')}>
            Saved Recipes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home