import { serverHTTP } from './http';
import './websocket';

serverHTTP.listen(3000, () => console.log('Server running...'));
