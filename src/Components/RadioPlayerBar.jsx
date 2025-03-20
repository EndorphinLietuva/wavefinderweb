import { Howl } from "howler";
import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "../context/AppContext";

export default function RadioPlayerBar() {
	const { currentStation, clearRadioStation } = useContext(AppContext);
	const [isPlaying, setIsPlaying] = useState(
		localStorage.getItem("radioPlaying") === "true"
	);
	const [volume, setVolume] = useState(() =>
		parseInt(localStorage.getItem("playerVolume") || "50", 10)
	);
	const soundRef = useRef(null);
	const fallbackIcon =
		"https://img.icons8.com/ios-filled/150/000000/radio.png";

	// Initialize Howl when station changes
	useEffect(() => {
		if (!currentStation?.url_resolved) return;

		soundRef.current = new Howl({
			src: [currentStation.url_resolved],
			html5: true,
			volume: volume / 100
		});

		if (isPlaying) {
			soundRef.current.play();
		}

		return () => soundRef.current?.unload();
	}, [currentStation]);

	useEffect(() => {
		soundRef.current?.volume(volume / 100);
		localStorage.setItem("playerVolume", volume.toString());
	}, [volume]);

	useEffect(() => {
		localStorage.setItem("radioPlaying", isPlaying.toString());
	}, [isPlaying]);

	const handlePlayPause = () => {
		if (!soundRef.current) return;

		if (isPlaying) {
			soundRef.current.pause();
		} else {
			soundRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	if (!currentStation) return null;

	return (
		<div className="bg-base-300 flex justify-between items-center p-4">
			<div className="flex">
				<img
					src={currentStation.favicon || fallbackIcon}
					alt={`${currentStation.name} icon`}
					className="w-16"
				/>
				<div className="px-2">
					<h4 className="font-bold">{currentStation.name}</h4>
					<p>{currentStation.info}</p>
				</div>
			</div>
			<div className="flex gap-2">
				<button className="btn btn-primary" onClick={handlePlayPause}>
					{isPlaying ? "Pause" : "Play"}
				</button>
			</div>
			<div className="flex items-center space-x-4 px-6">
				<input
					className="range range-xs"
					type="range"
					min="0"
					max="100"
					value={volume}
					onChange={(e) => setVolume(parseInt(e.target.value, 10))}
				/>
				<h6 className="w-2">{volume}%</h6>
			</div>
		</div>
	);
}
