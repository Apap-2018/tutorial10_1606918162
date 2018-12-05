import React from 'react';
import { Link } from "react-router-dom";

export const DaftarStaffFarmasiRow = (props) => {
    return (
        <tbody>
            {props.listStaffFarmasi.map(staff => {
                return (
                    <tr key={staff.id}>
                        <td>{staff.nama}</td>
                        <td>{staff.jenis}</td>
                        <td>
                            <Link to={`/update-pasien/${staff.id}`} className="btn btn-info">Update</Link>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}