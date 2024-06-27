import { useState } from 'react'

export function CardPrevisao() {

    const [cidade, setCidade] = useState('')
    const [previsaoDoTempo, setPrevisaoDoTempo] = useState(null)

    const handleChange = (e) => {
        setCidade(e.target.value)
    }

    const handleSearch = () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=1b4af2ab79cc43eb84d233834242606&q=${cidade}&lang=pt`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then((data) => {
                setPrevisaoDoTempo(data)
            })
    }

    return (

        <main className="card text-bg-light mb-3">
            <div className="card-body">
                <h2>
                    Verifique agora a previsão do tempo em sua cidade!
                </h2>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <input className="form-control"
                            onChange={handleChange}
                            type="text"
                            placeholder="Digite o nome da cidade"
                            value={cidade} />
                    </div>
                </div>

                <button className="btn btn-primary btn-lg" onClick={handleSearch}>
                    Pesquisar
                </button>

                {previsaoDoTempo ? (
                    <div>
                        <div>
                            <div>
                                <img src={previsaoDoTempo.current.condition.icon} />
                            </div>
                            <div>
                                <h3>Tempo {previsaoDoTempo.current.condition.text}</h3>
                                <h5>{previsaoDoTempo.location.name}</h5>
                                <h5>{previsaoDoTempo.location.region}</h5>
                                <h5>{previsaoDoTempo.location.country}</h5>
                                <p><b>Temperatura:</b> {previsaoDoTempo.current.temp_c} Cº</p>
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        </main>

    )

}