import { useNavigate } from "react-router-dom"

const Home = () =>  {
    const navigate = useNavigate();
    return(
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to Meal Explorer 🍽️</h1>
        
        <div style={{ marginTop: '30px' }}>
          <button 
            onClick={() => navigate('/search')} 
            style={{ marginRight: '20px', padding: '10px 20px', fontSize: '16px' }}
          >
            Search Recipes
          </button>
  
          <button 
            onClick={() => navigate('/saved')} 
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Saved Recipes
          </button>
        </div>
      </div>
    
    )
}

export default Home