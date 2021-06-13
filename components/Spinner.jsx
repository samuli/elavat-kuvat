import { FaSpinner } from 'react-icons/fa';

const Spinner = ({ style, width="8", height="8" }) => <FaSpinner className={`w-${width} h-${height} animate-spin`} style={{...style}}/>;

export default Spinner;
