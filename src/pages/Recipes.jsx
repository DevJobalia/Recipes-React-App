import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';


function Recipes() {

  const params = useParams();
  const [recipeDetail, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = async ()=>{
    const api = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const data = await api.json();
    setDetails(data)
  }
  
  useEffect(()=>{
    fetchDetails();
  },[]);

  return (
   <DetailWrapper>
    <div>
      <h2>{recipeDetail.title}</h2>
      <img src={recipeDetail.image} alt="" />
    </div>
    <Info>
      <Button className={activeTab === 'instructions' ? 'active': ''} onClick={()=> setActiveTab('instructions')}>Instructions</Button>
      <Button className={activeTab === 'ingredients' ? 'active': ''} onClick={()=> setActiveTab('ingredients')}>Ingredients</Button>
      {activeTab === 'instructions' && (
        <div>
          <h3 dangerouslySetInnerHTML={{__html: recipeDetail.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{__html: recipeDetail.instructions}}></h3>
        </div>
      )}; 
      {activeTab === 'ingredients' && (     
        <ul>
          {recipeDetail.extendedIngredients.map((ingredients)=>(
            <li key={ingredients.id}>{ingredients.original}</li>
          ))}
        </ul>
      )};       
    </Info>
   </DetailWrapper> 
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  img{
    height: 250px;
    width: 400px;
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;

  }
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background: white;
  color: #313131;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600; 
`;

const Info = styled.div`
  margin-left: 8rem;  
`;

export default Recipes;