import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Box from "@mui/material/Box";

export function MovingSideBars(){
    return (
        <SvgIcon>
            <svg width="439" height="110" viewBox="0 0 439 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_0_1)">
                <rect x="4" y="42" width="380" height="26" fill="#D9D9D9"/>
                </g>
                <g filter="url(#filter1_f_0_1)">
                <rect x="4" y="80" width="313" height="26" fill="#D9D9D9"/>
                <rect x="4.5" y="80.5" width="312" height="25" stroke="black"/>
                </g>
                <g filter="url(#filter2_f_0_1)">
                <rect x="4" y="4" width="431" height="26" fill="#D9D9D9"/>
                <rect x="4.5" y="4.5" width="430" height="25" stroke="black"/>
                </g>
                <defs>
                <filter id="filter0_f_0_1" x="0" y="38" width="388" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_0_1"/>
                </filter>
                <filter id="filter1_f_0_1" x="0" y="76" width="321" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_0_1"/>
                </filter>
                <filter id="filter2_f_0_1" x="0" y="0" width="439" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_0_1"/>
                </filter>
                </defs>
            </svg>
        </SvgIcon>
    )
}