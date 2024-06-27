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

        <main className="container">
            <div className="jumbotron">
                <h1>
                    Verifique agora a previsão do tempo em sua cidade!
                </h1>
                <p className="lead">
                    Digite o nome de sua cidade:
                </p>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <input className="form-control"
                            onChange={handleChange}
                            type="text"
                            value={cidade} />
                    </div>
                </div>

                <button className="btn btn-primary btn-lg" onClick={handleSearch}>
                    Pesquisar
                </button>

                {previsaoDoTempo ? (
                    <div>
                        <div className="mt-4">
                            <div>
                                <img src={previsaoDoTempo.current.condition.icon} />
                            </div>
                            <div>
                                <h3>Tempo {previsaoDoTempo.current.condition.text}</h3>
                                <p>Temperatura: {previsaoDoTempo.current.temp_c} Cº</p>
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        </main>

    )

}