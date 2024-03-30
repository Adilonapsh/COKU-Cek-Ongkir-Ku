import axios from 'axios'


const getLocation = async (input) => {
    const data = await axios.get("http://localhost:3001/api/cek-ongkir/location",{
        params:{
            "input": input,
        }
    });
    return data.data;
}

const getCourierPrice = async (origin_area_id, destination_area_id, weight) => {
    const data = await axios.get("http://localhost:3001/api/cek-ongkir/rates",{
        params:{
            origin_area_id : origin_area_id,
            destination_area_id : destination_area_id,
            weight : weight
        }
    });
    return data.data;
}

export {
    getLocation,
    getCourierPrice
}