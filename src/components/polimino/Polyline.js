import React from 'react';

export default function Polyline({ type, coords, angle, stroke }) {
	const {x,y} = {...coords}
	const points = [];

	switch (type) {
		case 'o':
			//drawing the line
			points.push(x,y,x+10,y,x+10,y+20,x-10,y+20,x-10,y,x,y)
			break
			
		case 'i':
			if (angle === 0) {
				points.push(x-10,y,x+30,y,x+30,y+10,x-10,y+10,x-10,y);
			}else if (angle === 90) {
				points.push(x,y-10,x,y+30,x+10,y+30,x+10,y-10,x,y-10);
			}else if (angle === 180) {
				points.push(x-20,y,x+20,y,x+20,y+10,x-20,y+10,x-20,y);
			}else{
				points.push(x,y-20,x+10,y-20,x+10,y+20,x,y+20,x,y-20);
			}
			break
			
		case 'l':
			if (angle === 0) {
				points.push(x,y-10,x,y+20,x+20,y+20,x+20,y+10,x+10,y+10,x+10,y-10,x,y-10);
			}else if (angle === 90) {
				points.push(x-10,y,x+20,y,x+20,y+10,x,y+10,x,y+20,x-10,y+20,x-10,y);
			}else if (angle === 180) {
				points.push(x,y,x,y+20,x+10,y+20,x+10,y-10,x-10,y-10,x-10,y,x,y);
			}else{
				points.push(x-10,y,x-10,y+10,x+20,y+10,x+20,y-10,x+10,y-10,x+10,y,x-10,y);
			}
			break
			
		case 'j':
			if (angle === 0) {
				points.push(x,y-10,x+10,y-10,x+10,y+20,x,y+20,x-10,y+20,x-10,y+10,x,y+10,x,y-10);
			}else if (angle === 90) {
				points.push(x,y,x+20,y,x+20,y+10,x-10,y+10,x-10,y-10,x,y-10,x,y);
			}else if (angle === 180) {
				points.push(x,y-10,x+20,y-10,x+20,y,x+10,y,x+10,y+20,x,y+20,x,y-10);
			}else{
				points.push(x-10,y,x+20,y,x+20,y+20,x+10,y+20,x+10,y+10,x-10,y+10,x-10,y);
			}
			break	
		
		case 's':
			if (angle === 0) {
				points.push(x,y,x+20,y,x+20,y+10,x+10,y+10,x+10,y+20,x-10,y+20,x-10,y+10,x,y+10,x,y);
			}else if (angle === 90) {
				points.push(x,y,x+10,y,x+10,y+20,x,y+20,x,y+10,x-10,y+10,x-10,y-10,x,y-10,x,y);
			}else if (angle === 180) {
				points.push(x,y,x,y-10,x+20,y-10,x+20,y,x+10,y,x+10,y+10,x-10,y+10,x-10,y,x,y);
			}else{
				points.push(x,y,x,y-10,x+10,y-10,x+10,y,x+20,y,x+20,y+20,x+10,y+20,x+10,y+10,x,y+10,x,y);
			}
			break
		
		case 'z':
			if (angle === 0) {
				points.push(x-10,y,x+10,y,x+10,y+10,x+20,y+10,x+20,y+20,x,y+20,x,y+10,x-10,y+10,x-10,y);
			}else if (angle === 90) {
				points.push(x,y-10,x+10,y-10,x+10,y+10,x,y+10,x,y+20,x-10,y+20,x-10,y,x,y,x,y-10);
			}else if (angle === 180) {
				points.push(x-10,y,x-10,y-10,x+10,y-10,x+10,y,x+20,y,x+20,y+10,x,y+10,x,y,x-10,y);
			}else{
				points.push(x,y,x+10,y,x+10,y-10,x+20,y-10,x+20,y+10,x+10,y+10,x+10,y+20,x,y+20,x,y);
			}
			break
		
		//case 't':
		default:
			if (angle === 0) {
				points.push(x-10,y,x+20,y,x+20,y+10,x+10,y+10,x+10,y+20,x,y+20,x,y+10,x-10,y+10,x-10,y);
			}else if (angle === 90) {
				points.push(x,y-10,x+10,y-10,x+10,y+20,x,y+20,x,y+10,x-10,y+10,x-10,y,x,y,x,y-10);
			}else if (angle === 180) {
				points.push(x+10,y,x+20,y,x+20,y+10,x-10,y+10,x-10,y,x,y,x,y-10,x+10,y-10,x+10,y);
			}else{
				points.push(x,y+20,x,y-10,x+10,y-10,x+10,y,x+20,y,x+20,y+10,x+10,y+10,x+10,y+20,x,y+20);
			}
			break
	}
	
	return <polyline stroke={stroke} strokeWidth='1px' strokeOpacity='.8' points={points}/>
}