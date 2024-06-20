import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const modelJson = require('../../../assets/tfjs_model/model.json');
const modelWeights = [
  require('../../../assets/tfjs_model/group1-shard1of7.bin'),
  require('../../../assets/tfjs_model/group1-shard2of7.bin'),
  require('../../../assets/tfjs_model/group1-shard3of7.bin'),
  require('../../../assets/tfjs_model/group1-shard4of7.bin'),
  require('../../../assets/tfjs_model/group1-shard5of7.bin'),
  require('../../../assets/tfjs_model/group1-shard6of7.bin'),
  require('../../../assets/tfjs_model/group1-shard7of7.bin'),
];

export const loadModel = async () => {
  await tf.ready();
  const model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
  return model;
};

export const preprocessImage = async (uri) => {
  const imgB64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
  const raw = new Uint8Array(imgBuffer);
  const imageTensor = tf.browser.fromPixels({ data: raw, width: 224, height: 224 }, 3);
  const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
  const normalized = resized.div(tf.scalar(255));
  const batched = normalized.expandDims(0);
  return batched;
};
