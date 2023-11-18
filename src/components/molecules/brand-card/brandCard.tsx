import './brand.scss';

const Images = [
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/volkswagen.svg',
    alt: 'Volkswagen logo',
    width: '48',
    height: '40',
  },
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/samsung.svg',
    alt: 'Samsung logo',
    width: '101',
    height: '34',
  },
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/cisco.svg',
    alt: 'Procter & Gamble logo',
    width: '48',
    height: '48',
  },
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/att.svg',
    alt: 'Citi logo',
    width: '62',
    height: '40',
  },
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/procter_gamble.svg',
    alt: 'Volkswagen logo',
    width: '48',
    height: '40',
  },
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/hewlett_packard_enterprise.svg',
    alt: 'Samsung logo',
    width: '101',
    height: '34',
  },
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/citi.svg',
    alt: 'Procter & Gamble logo',
    width: '48',
    height: '48',
  },
  {
    src: 'https://s.udemycdn.com/partner-logos/ou-v1/ericsson.svg',
    alt: 'Procter & Gamble logo',
    width: '48',
    height: '48',
  },
];

const Brand = () => {
  return (
    <div className="brand-Container mt-30">
      <div className="content">
        <div className="brandWrapper">
          <h2>
            Trusted by over 15,000 companies and millions of learners around the
            world
          </h2>
          <div className="brandContainer">
            {Images.map((img, index) => (
              <div className="brand">
                <img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
