/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const OrderForm = ({ formData, handleInputChange, handleFileChange, isReadOnly, isPackageIdHidden }) => {
    const inputClass = `mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 ${isReadOnly ? 'cursor-not-allowed' : ''}`;

    if (formData.status_id === 7) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-3xl font-bold mb-4">Pemasangan Selesai</h2>
                <p className="text-lg">Silakan Lakukan Pembayaran Untuk Mengaktifkan Layanan Internet Anda</p>
            </div>
        );
    }

    return (
        <form className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md shadow-md">
            <div className="left-panel">
                <div className="mb-4">
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                    <input type="text" name="nama" id="nama" value={formData.nama || ''} onChange={handleInputChange} readOnly={isReadOnly} className={inputClass} />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={formData.email || ''} onChange={handleInputChange} readOnly={isReadOnly} className={inputClass} />
                </div>

                <div className="mb-4">
                    <label htmlFor="upload_identity" className="block text-sm font-medium text-gray-700">Upload Identity</label>
                    {isReadOnly ? (
                        formData.upload_identity ? (
                            <a href={`http://localhost:3003/v1/order/my-order/download/${formData.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Download Uploaded File</a>
                        ) : (
                            <p className="text-gray-500">No file uploaded</p>
                        )
                    ) : (
                        <input type="file" name="upload_identity" id="upload_identity" onChange={handleFileChange} required={!isReadOnly} className={inputClass} />
                    )}
                </div>

                {formData.status_id === 6 && formData.Teknisi && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="teknisi_nama" className="block text-sm font-medium text-gray-700">Nama Teknisi</label>
                            <input type="text" name="teknisi_nama" id="teknisi_nama" value={formData.Teknisi.nama || ''} readOnly={true} className={inputClass} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="teknisi_nip" className="block text-sm font-medium text-gray-700">NIP Teknisi</label>
                            <input type="text" name="teknisi_nip" id="teknisi_nip" value={formData.Teknisi.nip || ''} readOnly={true} className={inputClass} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="teknisi_no_telp" className="block text-sm font-medium text-gray-700">No. Telp Teknisi</label>
                            <input type="text" name="teknisi_no_telp" id="teknisi_no_telp" value={formData.Teknisi.no_telp || ''} readOnly={true} className={inputClass} />
                        </div>
                    </>
                )}
            </div>

            <div className="right-panel">
                <div className="mb-4">
                    <label htmlFor="kota" className="block text-sm font-medium text-gray-700">Kota</label>
                    <input type="text" name="kota" id="kota" value={formData.kota || ''} onChange={handleInputChange} readOnly={isReadOnly} className={inputClass} />
                </div>

                <div className="mb-4">
                    <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">Kecamatan</label>
                    <input type="text" name="kecamatan" id="kecamatan" value={formData.kecamatan || ''} onChange={handleInputChange} readOnly={isReadOnly} className={inputClass} />
                </div>

                <div className="mb-4">
                    <label htmlFor="jalan" className="block text-sm font-medium text-gray-700">Jalan</label>
                    <input type="text" name="jalan" id="jalan" value={formData.jalan || ''} onChange={handleInputChange} readOnly={isReadOnly} className={inputClass} />
                </div>

                <div className={`mb-4`}>
                    <label htmlFor="package_id" className="block text-sm font-medium text-gray-700">Package ID</label>
                    <input type="number" name="package_id" id="package_id" value={formData.package_id || ''} onChange={handleInputChange} readOnly={isReadOnly} className={inputClass} />
                </div>
            </div>
        </form>
    );
};

export default OrderForm;
