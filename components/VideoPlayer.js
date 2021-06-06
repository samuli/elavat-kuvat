import { LionPlayer } from 'lion-player';
import 'lion-player/dist/lion-skin.min.css';

const VideoPlayer = ({ src, width, height }) => (
  <LionPlayer sources={[src]} height={height} width={width} />
);

export default VideoPlayer;
