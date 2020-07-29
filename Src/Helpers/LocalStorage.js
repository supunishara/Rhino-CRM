import AsyncStorage from '@react-native-community/async-storage';

//clientAuthID


class LocalStorage {
    getData = async (key) => {
      try {
        const retrievedItem =  await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
      } catch (error) {
      }
      return
      }


    storeData = async (key, value) => {
      try {
        var val = await AsyncStorage.setItem(key, JSON.stringify(value));
        return val;
      } catch (error) {
        }
      }

    clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
    }



}
export default LocalStorage;