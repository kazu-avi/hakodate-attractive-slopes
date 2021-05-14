import React from 'react';
import { CategoryCard } from './index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DisplayCategoriesArea = (props) => {
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        swipe: true,
        autoplay: true,
        pauseOnHover: true,
        autoplaySpeed: 4000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };
    const categories = props.categories;
    return (
        <>
            <Slider {...settings}>
                {categories.map((category) => (
                    <CategoryCard key={category.id} id={category.id} image={category.img} name={category.name} />
                ))}
            </Slider>
        </>
    );
};

export default DisplayCategoriesArea;
