import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

export function RadioPlayerBar({ radioStation }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(50);
	const soundRef = useRef(null);
	const fallbackIcon =
		"https://img.icons8.com/ios-filled/150/000000/radio.png";

	// Initialize Howl only once or when station.url_resolved changes
	useEffect(() => {
		soundRef.current = new Howl({
			src: [radioStation.url_resolved], // Ensure this is an array, as Howl expects one
			html5: true, // Enables streaming large files
			volume: volume / 100 // Convert percentage to range [0, 1]
		});

		return () => {
			if (soundRef.current) {
				soundRef.current.unload();
			}
		};
	}, [radioStation.url_resolved]); // only re-run if the stream URL changes

	const handlePlayPause = () => {
		if (!soundRef.current) return;

		if (isPlaying) {
			soundRef.current.pause();
		} else {
			soundRef.current.play();
		}
		setIsPlaying((prevState) => !prevState);
	};

	const handleVolumeChange = (event) => {
		const newVolume = parseInt(event.target.value, 10);
		setVolume(newVolume);
		if (soundRef.current) {
			// Update Howl instance's volume (value from 0.0 to 1.0)
			soundRef.current.volume(newVolume / 100);
		}
	};

	return (
		<>
			<div className="bg-base-300 flex justify-between items-center p-4">
				<div className="flex">
					<img
						src={
							radioStation.favicon
								? radioStation.favicon
								: fallbackIcon
						}
						alt={`${radioStation.name} icon`}
						className="w-16"
					/>
					<div className="px-2">
						<h4 className="font-bold">{radioStation.name}</h4>
						<p>{radioStation.info}</p>
					</div>
				</div>
				<button className="btn btn-primary" onClick={handlePlayPause}>
					{isPlaying ? "Pause" : "Play"}
				</button>
				<div className="flex items-center space-x-4 px-6">
					<input
						className="range range-xs"
						type="range"
						min="0"
						max="100"
						value={volume}
						onChange={handleVolumeChange}
					/>
					<h6 className="w-2">{volume}%</h6>
				</div>
			</div>
		</>
	);
}

export default RadioPlayerBar;
