"use client"
import React, { useState } from 'react'
import Select from 'react-select'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { getCourierPrice, getLocation } from './cekongkir.service'
import _ from 'lodash'
import Image from 'next/image'
// import Select from '../components/select'

export default function CekOngkir() {
    const [options, setOptions] = useState([]);
    const [wilayahAwal, setWilayahAwal] = useState(null);
    const [wilayahAkhir, setWilayahAkhir] = useState(null);
    const [berat, setBerat] = useState(1000);
    const [listData, setListData] = useState([]);
    const [listPricing, setListPricing] = useState([]);

    const debouncedLoadOptions = _.debounce(async (inputValue, callback) => {
        try {
            if (inputValue) {
                const data = await getLocation(inputValue);

                const formattedOptions = data.data.map(item => ({
                    value: item.id,
                    label: item.name,
                }));

                callback(formattedOptions);
            } else {
                callback([]);
            }
        } catch (error) {
            console.error('Error fetching options: ', error);
            callback([]);
        }
    }, 500);

    const loadLocationOptions = (inputValue, callback) => {
        debouncedLoadOptions(inputValue, callback);
    };

    const setStartLocation = (selectedOption) => {
        setWilayahAwal(selectedOption.value);
    }
    const setDestinationLocation = (selectedOption) => {
        setWilayahAkhir(selectedOption.value);
    }

    const setBeratGram = (selectedOption) => {
        setBerat(selectedOption);
    }

    const handleSubmit = async () => {
        console.log(wilayahAwal)
        console.log(berat)
        console.log(wilayahAkhir)
        const data = await getCourierPrice(wilayahAwal, wilayahAkhir, berat);
        setListData(data.data)
        setListPricing(data.data.pricing)
        console.log(data.data)
    }

    return (
        <div>
            <div className='h-[500px]'>
                <div className='h-full flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-bold mb-10'>Cek Ongkir Semua Ekspedisi (JNE, TIKI, GOJEK, SICEPAT, ANTER AJA)</h1>
                    <div className='bg-slate-900 rounded-xl p-10'>
                        <form>
                            <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
                                <div>
                                    <label htmlFor="">Wilayah Awal</label>
                                    <AsyncCreatableSelect onChange={setStartLocation} placeholder="Cari Wilayah" isClearable cacheOptions defaultOptions loadOptions={loadLocationOptions} options={options} loadingMessage={() => "Mencari.."} noOptionsMessage={() => "Tidak ada opsi tersedia"} className='text-black w-96' autoFocus='true' />
                                </div>
                                <div>
                                    <label htmlFor="">Wilayah Tujuan</label>
                                    <AsyncCreatableSelect onChange={setDestinationLocation} placeholder="Cari Wilayah" isClearable cacheOptions defaultOptions loadOptions={loadLocationOptions} options={options} loadingMessage={() => "Mencari.."} noOptionsMessage={() => "Tidak ada opsi tersedia"} className='text-black w-96' autoFocus='true' />
                                </div>
                                <div>
                                    <label htmlFor="">Berat (Gram)</label>
                                    <input type="text" className="text-black w-full p-2 rounded-md placeholder:text-gray-400" placeholder="1000" value="1000" onChange={setBeratGram} />
                                </div>
                                <button type='button' className='bg-blue-700 px-5 py-2 self-end rounded-md' onClick={handleSubmit}>Kirim</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-center gap-10 bg-slate-900 p-5 mb-10'>
                        <div>
                            <h1 className='text-3xl mb-5'>Wilayah Awal</h1>
                            <ul className='list-disc'>
                                <li>Provinsi : {listData?.origin?.administrative_division_level_1_name}</li>
                                <li>Kabupaten : {listData?.origin?.administrative_division_level_2_name}</li>
                                <li>Kecamatan : {listData?.origin?.administrative_division_level_3_name}</li>
                                <li>Kelurahan/Desa : {listData?.origin?.administrative_division_level_4_name}</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-3xl mb-5'>Wilayah Akhir</h1>
                            <ul className='list-disc'>
                            <li>Provinsi : {listData?.destination?.administrative_division_level_1_name}</li>
                                <li>Kabupaten : {listData?.destination?.administrative_division_level_2_name}</li>
                                <li>Kecamatan : {listData?.destination?.administrative_division_level_3_name}</li>
                                <li>Kelurahan/Desa : {listData?.destination?.administrative_division_level_4_name}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='px-80'>
                        {
                            listPricing.map((item, index) => {
                                return (
                                    <div className='grid grid-cols-4 items-center justify-between text-center mb-5' key={index}>
                                        <Image src={`https://biteship.com/images/landing/${item.company}.webp`} width={150} height={150} className='w-20 h-20 rounded-full' alt={''} />
                                        <div>
                                            <p className='text-2xl font-bold'>{item.courier_name}</p>
                                            <p className='text-lg'>{item.courier_service_name} - {item.courier_service_code}</p>
                                        </div>
                                        <div>
                                            <p>Duration : {item.duration}</p>
                                            <div className='w-60'>
                                                {/* {item.available_collection_method.map((v) => <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{v}</span>)} */}
                                            </div>
                                        </div>
                                        <div className='text-end'>
                                            <p>Harga</p>
                                            <h4 className='text-3xl font-bold'>Rp. {item.price}</h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
