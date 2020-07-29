import NetInfo from "@react-native-community/netinfo";

export default class NetworkConnectivity {
    async checkNetworkConnectivityFunc() {
       return await NetInfo.fetch()
            .then(state => {
                return state.isConnected;
          })
          .catch(error => {
            return error;
          });
    }
}