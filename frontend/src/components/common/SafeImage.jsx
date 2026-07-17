import { IMAGE_URL } from '../../utils/constants';

const SafeImage = ({ src, alt, type=null, className, ...props }) => {
    // If src starts with "/" or "http", load it directly
    const imageSrc = (src && (src.startsWith('/') || src.startsWith('http')))
        ? src
        : (IMAGE_URL + (type || '') + (src || ''));
  
    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            {...props}
        />
    );
};

export default SafeImage;
