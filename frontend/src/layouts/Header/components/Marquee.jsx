import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMarquee } from '../../../features/home/HomeSlice';

const Marquee = () => {
    const dispatch = useDispatch();
    const { marquee } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(getMarquee());
    }, [dispatch]);

    const announcements =
        marquee?.length
            ? marquee
            : [];

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {announcements.map((announcement, index) => (
                    <span key={index} className="marquee-item">
                        {announcement.text}
                    </span>
                ))}
            </div>

            <div className="marquee-content" aria-hidden="true">
                {announcements.map((announcement, index) => (
                    <span key={index} className="marquee-item">
                        {announcement.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;