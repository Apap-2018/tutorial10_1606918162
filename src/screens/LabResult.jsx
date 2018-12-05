import React from 'react';
import { Loading } from '../components/Loading';
import { FormLabResult } from '../containers/FormLabResult';
import { Appointment } from '../utils/Appointment';

export class LabResult extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			pasien: {},
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this)

		Appointment.getDetailPasien(this.props.match.params.id).then(response => {
			if (response.status === 200) {
				this.setState({
					loading: false,
					pasien: response.result
				})
			}
			else{
				alert('Data tidak ditemukan')
				this.props.history.push('/all-pasien')
			}
		})
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.setState({
			loading: true
		})

		const data = new FormData(e.target)
		const dataJson = {}

		data.forEach((val, key) => {
			if(val !== ""){
				let name = key.split('.');
				if(name.length > 1){
					let last = name.pop()
					name.reduce((prev,next) => {
						return prev[next] = prev[next] || {};
					}, dataJson)[last] = val
				} else{
					dataJson[key] = val
				}
			}
		})


		Appointment.addLabResult(dataJson).then(response => {
			if(response.status === 200) {
				this.setState({
					loading: false,
				})
				alert(`Sukses menambahkan hasil lab pasien ${this.state.pasien.nama}`)
			} else{
				this.setState({
					loading: false
				})
				alert(`Gagal menambahkan hasil lab pasien ${this.state.pasien.nama}`)
			}
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<Loading msg="Fetching Data..." />
			)
		} else {
			return (
				<FormLabResult pasien={this.state.pasien} onSubmit={this.handleFormSubmit} />
			)
		}
	}
}
