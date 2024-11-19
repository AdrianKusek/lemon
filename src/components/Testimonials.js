

import testimonial1 from "../assets/testimonial-1.jpg";
import testimonial2 from "../assets/testimonial-2.jpg";
import testimonial3 from "../assets/testimonial-3.jpg";
import testimonial4 from "../assets/testimonial-4.jpg";
import { useEffect, useRef, useState } from 'react';
import "./Testimonials.css";

const Testimonials = () =>
{


	return (
		<section className="backgroundBanner primaryGreen background">
			<div className="content standardTopMargin" style={{ marginBottom: 0 }}>
				<h1 className="highlightWhite text" style={{ display: "block" }}>Testimonials</h1>
				<TestimonialsList />
			</div>
		</section>
	);
};

const TestimonialCard = ({ name, score, imgSrc, comment, style }) =>
{
	return (
		<article className="highlightWhite background testimonialCard shadow" style={{ ...style }}>
            <h5 className="cardTitle name">{name}</h5>
			<span className="cardTitle">{score}</span>
			<div style={{ display: "flex" }}>
				<img src={imgSrc} style={{ width: "50%", aspectRatio: "1/1", objectFit: "cover" }} title="The reviewer's profile picture" />
				
			</div>
            
			<q className="quote">
				{comment}
			</q>
		</article>
	);
};

const TestimonialsList = () =>
{
	const data = useRef({ cardWidth: 0, totalWidth: 0, distancePerScroll: 0, windowWidth: 0 });

	const [contentRemainingToLeft, setContentRemainingToLeft] = useState(0);
	const [contentRemainingToRight, setContentRemainingToRight] = useState(0);

	const [scrollOffset, setScrollOffset] = useState(0);


	const listGap = 20;
	const containerRef = useRef(null);

	const onMountAndResize = () => 
	{
		const windowWidth = containerRef.current.clientWidth;

		const cardWidth = Math.max(230, windowWidth / 4);

		const totalWidth = reviews.length * (cardWidth + listGap);

		setContentRemainingToRight(totalWidth - windowWidth);
		setContentRemainingToLeft(0);
		setScrollOffset(0);
		const distancePerScroll = totalWidth / reviews.length;

		data.current = { cardWidth, totalWidth, distancePerScroll, windowWidth };
	};


	const resizeHandler = useEffect(() =>
	{
		onMountAndResize();

		window.addEventListener("resize", onMountAndResize);

		return () => window.removeEventListener("resize", onMountAndResize);
	}, []);


	const incrementScroll = () =>
	{
		setScrollOffset(Math.min(data.current.totalWidth - data.current.windowWidth, scrollOffset + data.current.distancePerScroll));
		setContentRemainingToRight(contentRemainingToRight - data.current.distancePerScroll);
		setContentRemainingToLeft(contentRemainingToLeft + data.current.distancePerScroll);
	};

	const decrementScroll = () =>
	{
		setScrollOffset(Math.max(0, scrollOffset - data.current.distancePerScroll));
		setContentRemainingToLeft(contentRemainingToLeft - data.current.distancePerScroll);
		setContentRemainingToRight(contentRemainingToRight + data.current.distancePerScroll);
	};

	return (
		<div className="testimonialsListWrapper" ref={containerRef}>
			<div className="testimonialsList" style={{ gap: listGap, left: (-scrollOffset + "px") }}>
				{reviews.map((review, index) => <TestimonialCard {...review} key={index} style={{ width: data.current.cardWidth + "px" }} />)}
			</div>
			<div className={"floatingArrow left" + (contentRemainingToLeft <= 0 ? " disabled" : "")} onClick={decrementScroll}><div className="arrow left"></div></div>
			<div className={"floatingArrow right" + (contentRemainingToRight <= 0 ? " disabled" : "")} onClick={incrementScroll}><div className="arrow right"></div></div>
		</div>
	);
};

const reviews = [
	{
		name: "Emma",
		score: "⭐⭐⭐⭐⭐",
		imgSrc: testimonial1,
		comment: "Very delicious food"
	},
	{
		name: "John",
		score: "⭐⭐⭐⭐",
		imgSrc: testimonial2,
		comment: "Avocado was very brown, but otherwise good!"
	},
	{
		name: "Matt",
		score: "⭐⭐⭐⭐",
		imgSrc: testimonial3,
		comment: "MY FAVORITE LUNCH SPOT"
	},
	{
		name: "Lily",
		score: "⭐⭐⭐⭐⭐",
		imgSrc: testimonial4,
		comment: "Had a good time."
	},
	
	
];

export default Testimonials;