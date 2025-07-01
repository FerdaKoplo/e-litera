import React from 'react';

interface Props {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    // spineColor?: string;
    edgeColor?: string;
}

export default function Book3D({
    src,
    alt = 'Book cover',
    width = 260,
    height = 360,
    // spineColor,
    edgeColor = '#000000',
}: Props) {
    const spineWidth = 30;
    const edgeDepth = 10;

    return (
        <div
            className="relative"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                perspective: '1200px',
            }}
        >
            <div
                className="relative w-full h-full"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(-20deg)`,
                }}
            >
                {/* Front Cover */}
                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        backfaceVisibility: 'hidden',
                        zIndex: 3,
                    }}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover  shadow-xl"
                    />
                </div>

                {/* Spine */}
                {/* <div
                    className="absolute top-0 left-0"
                    style={{
                        width: `${spineWidth}px`,
                        height: `286px`,
                        backgroundColor: spineColor,
                        transform: `rotateY(40deg) translateZ(-${spineWidth}px) translateY(-3px)`,
                        transformOrigin: 'left top',
                        zIndex: 2,
                        borderTopLeftRadius: '6px',
                        borderBottomLeftRadius: '6px',
                    }}
                /> */}

                {/* Page Edges with "page line" effect */}
                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: `70px`,
                        height: `${height}px`,
                        backgroundImage: `repeating-linear-gradient(
                        to right,  #fdfdfd 0px, #fdfdfd 0.6px, #dcdcdc 0.6px, #dcdcdc 1px`,
                        transform: `translateX(${width}px) rotateY(90deg)`,
                        transformOrigin: 'left center',
                        zIndex: 1,
                    }}
                />
            </div>
        </div>
    );
}
