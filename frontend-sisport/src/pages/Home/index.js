import React from "react"

export default function LoginPage() {
    return <>

        <div className="container">

            <div className="row">

                <div className="col">

                    <div className="card mb-2 border-secondary">

                        <div className="card-body text-center">

                            <h2>¡Bienvenido a Sisport!</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col-lg-5 col-md-12 col-sm-12">

                    <div className="card mb-2 border-primary">

                        <div className="card-body text-center ">

                            <h5>Sistema informático para la gestión de portafolios académicos en la Universidad Técnica de Machala.</h5>

                            <div className="container mt-3">

                                <img className="img-fluid" width="65%" src="/img/logo_sistemas.png" alt="" />

                            </div>

                            <div className="row mt-2">

                                <div className="col">

                                    <p className="mb-1">Ingeniería de Sistemas y Tecnologías de la Información</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="col-lg-7 col-md-12 col-sm-12">

                    <div className="card mb-2 border-primary">

                        <div className="card-body">

                            <div id="carouselIndicador" className="carousel slide" data-ride="carousel">

                                <ol className="carousel-indicators">
                                    <li data-target="#carouselIndicador" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselIndicador" data-slide-to="1"></li>
                                    <li data-target="#carouselIndicador" data-slide-to="2"></li>
                                </ol>

                                <div className="carousel-inner">

                                    <div className="carousel-item active">
                                        <img className="d-block w-100" height="350" src="/img/banner1.jpg" alt="1" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" height="350" src="/img/banner2.jpg" alt="2" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" height="350" src="/img/banner3.jpg" alt="3" />
                                    </div>
                                </div>

                                <a className="carousel-control-prev" href="#carouselIndicador" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselIndicador" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col">

                    <div className="card border-secondary">

                        <div className="card-body text-center">

                            <p className="text-muted mb-1">Desarrollado por: Darwin Pilaloa Zea</p>

                        </div>

                    </div>

                </div>

            </div>
        </div>


    </>
}