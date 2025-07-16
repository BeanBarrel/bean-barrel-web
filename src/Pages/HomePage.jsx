

import React from 'react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-dark text-white text-center py-5">
        <h1 className="display-4">Bean Barrel</h1>
        <p className="lead">Brewing Happiness in Every Cup</p>
    
      </header>

      {/* Menu Preview */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Our Bestsellers</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipOUkYZ3F8y8MSOcOkVTBT1MOOX_UupUorKVz1QV=w289-h312-n-k-no"
                className="card-img-top"
                alt="Espresso"
              />
              <div className="card-body text-center">
                <h5 className="card-title">Espresso</h5>
                <p className="card-text">Strong and bold shot of coffee</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4npMCj4P7Jhj3w076PIURVnBo11QM3dUOR7sYxfToZuakz6HdaZtiPkX0WLEOnWCur0G5WFnhItV3tcyymYS2yG7V6r7YP6zfIxGYtYRQldX3Z8kMDifvbm4GEPulK-VfalSfYIh=s1360-w1360-h1020-rw"
                className="card-img-top"
                alt="Latte"
              />
              <div className="card-body text-center">
                <h5 className="card-title">Latte</h5>
                <p className="card-text">Creamy steamed milk with espresso</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipN6miXRYKX2qyNW5hjJbrruFkOVOCQKfes5ACvZ=s1360-w1360-h1020-rw"
                className="card-img-top"
                alt="Cappuccino"
              />
              <div className="card-body text-center">
                <h5 className="card-title">Cappuccino</h5>
                <p className="card-text">Rich foam and smooth coffee blend</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light text-center py-3">
        <p className="mb-0">© 2025 Zeeza Global. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
