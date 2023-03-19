import React, { useCallback, useEffect, useRef, useState } from "react";
import useWindowSize from "../customHooks/useWindowSize";

const Background = () => {
	const MIN_STARS = 100;
	const MAX_STARS = 200;
	const SECRET_KEY = "8008135".split("");
	const STAR_RANGE = Math.floor(
		Math.random() * (MAX_STARS - MIN_STARS) + MIN_STARS
	);

	const background = useRef(null);
	const [width, height] = useWindowSize();

	const [starCount, setStarCount] = useState(STAR_RANGE);
	const [keySequence, setKeySequence] = useState([]);

	const createStar = useCallback((width, height, existingStars) => {
		if (existingStars?.length > MAX_STARS) return;

		const star = document.createElement("i");
		star.classList.add("star");

		const size = Math.random() * 3;
		const duration = Math.random() * 2;

		const x = Math.floor(Math.random() * width);
		const y = Math.floor(Math.random() * height);

		star.style.width = 1 + size + "px";
		star.style.height = 1 + size + "px";

		star.style.top = y + "px";
		star.style.left = x + "px";

		star.style.animationDuration = 2 + duration + "s";
		star.style.animationDelay = duration + "s";

		background.current.appendChild(star);
	}, []);

	const removeStar = useCallback((stars) => {
		const starRate = Math.floor(Math.random() * (1000 - 100) + 100);
		setTimeout(
			() =>
				stars[
					Math.floor(Math.random() * (stars?.length - 1) + 1)
				].remove(),
			starRate
		);
	}, []);

	const checkEqual = (arr1, arr2) => {
		for (let i = 0; i < arr1?.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	};

	useEffect(() => {
		// add randomised stars and remove old stars

		const starRate = Math.floor(Math.random() * (1000 - 100) + 100);
		if (height === 0 || width === 0) return;

		const existingStars = [...background.current.querySelectorAll(".star")];

		if (existingStars?.length > 0) {
			removeStar(existingStars);
		}

		for (let i = 0; i < starCount; i++) {
			createStar(width, height, existingStars);
		}

		const shiftStars = setInterval(() => {
			const existingStars = [
				...background.current.querySelectorAll(".star"),
			];
			createStar(width, height, existingStars);
			removeStar(existingStars);
		}, starRate);

		return () => clearInterval(shiftStars);
	}, [removeStar, createStar, starCount, width, height]);

	useEffect(() => {
		// check if keys are pressed

		const handleKeyDown = (event) => {
			if (SECRET_KEY?.includes(event?.key)) {
				setKeySequence((prev) => [...prev, event?.key]);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [SECRET_KEY]);

	useEffect(() => {
		// using secret key for more stars

		if (SECRET_KEY?.length === keySequence?.length) {
			if (checkEqual(SECRET_KEY, keySequence)) {
				setStarCount((prev) => prev * 2);
				setKeySequence([]);
			}
		}
		for (let i = 0; i < keySequence?.length; i++) {
			if (keySequence[i] !== SECRET_KEY[i]) {
				setKeySequence((prev) =>
					prev?.length === 1 ? [] : [prev[prev?.length - 1]]
				);
			}
		}
	}, [SECRET_KEY, keySequence]);

	useEffect(() => {
		// Adding background for stars

		document.body.style.height = "100vh";
		document.body.style.overflow = "hidden";
		document.body.style.background =
			"radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)";
	}, []);

	return <div ref={background}></div>;
};

export default Background;
