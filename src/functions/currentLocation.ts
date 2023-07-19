const { Navigator } = require("node-navigator");

const currentLocation = () => {
    const navigator = new Navigator();
    navigator.geolocation.getCurrentPosition((success: any, error: any) => {
      if (error) return { success: false, result: error };
      else return { success: true, result: success };
    });
  };
export{currentLocation};