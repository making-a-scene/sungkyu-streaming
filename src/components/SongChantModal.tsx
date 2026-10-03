import chantData from '../data/sungkyu-chant.json';
import ChantModal from './ChantModal';

const SongChantModal = ({ title, onClose }: { title: string; onClose: () => void }) => {
    const item = chantData.find(song => song.title === title);
    return item ? <ChantModal item={item} onClose={onClose} /> : null;
};

export default SongChantModal;
