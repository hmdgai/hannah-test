// Ambient declarations for Swiper's CSS subpath imports.
// Swiper exposes these via its package.json "exports" field without a
// file extension (e.g. "swiper/css", "swiper/css/navigation"), and TS
// strict mode cannot resolve side-effect imports that lack type files.
// These declarations tell TS the imports are valid side-effects only.
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/autoplay';
