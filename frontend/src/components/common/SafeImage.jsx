import { IMAGE_URL } from '../../utils/constants';

const SafeImage = ({ src, alt, type=null, className, ...props }) => {
  
    return (
        <img
            src={IMAGE_URL + type + src}
            alt={alt}
            className={className}
            {...props}
        />
    );
};

export default SafeImage;
