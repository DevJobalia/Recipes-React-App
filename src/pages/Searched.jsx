import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Searched() {

    const [searchValue, setSearched] = useState([]);
    const params = useParams();

    const getSearched = async (name)=>{        
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&query=${name}`);
        const data = await api.json();        
        setSearched(data.results);
    }


    useEffect(()=>{
        getSearched(params.search);
    },[params.search])

  return (
    <Grid>
        {searchValue.map((value)=>{
            return(
                <Card key={value.id}>
                    <Link to={'/recipe/'+value.id}>
                        <img src={value.image} alt="" />
                        <h4>{value.title}</h4>
                    </Link>
                </Card>
            );
        })}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;        
    }
    a{
        text-decoration: none;        
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched