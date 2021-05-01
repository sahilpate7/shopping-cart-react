import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import CartItem from './CartItem';
import {random,commerce} from "faker";
import {Container,Col,Row} from 'reactstrap'
import userEvent from '@testing-library/user-event';

const apikey ="INSET_YOUR_KEY_HERE"

const url = 'https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1'
const localurl = "http://www.json-generator.com/api/json/get/cenNVeZueW?indent=2"

const BuyPage = ({addInCart}) => {

    // const [product,setProduct]=useState([]);

    // const fetchPhotos = async () =>{
    //     const response = await Axios.get(url,{
    //         header:{
    //             Authorization:apikey
    //         }
    //     });
    // }
    
    const [product,setProduct]=useState([]);

    const fetchPhotos = async () =>{
        const {data} = await Axios.get(localurl);
        // console.log(data)
        const {photos} = data;
    
        const allProducts = photos.map(photo =>({
            smallImage:photo.src.medium,
            tinyImage:photo.src.tiny,
            productName: random.word(),
            productPrice: commerce.price(),
            id: random.uuid()
        }));
        
        setProduct(allProducts);
    };


    useEffect(()=> {
        fetchPhotos()
    },[]);

    return(
        <Container fluid>
            <h1 className="text-success text-center">
                Buy Page
            </h1>
            <Row>
                {product.map(product =>(
                    <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default BuyPage;