import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
    {
        title: 'Gesellschafter',
        link: 'https://pnn-it.de/',
        description: (
            <>
                Webdesign and Hosting
                <br/>
                <a href="https://pnn-it.de" target="_blank">pnn-it.de</a>
            </>
        ),
    },
    {
        title: 'Technical Consultant @ Adobe',
        // Svg: require('../../static/images/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                AEM Consulting and Development
                <br/>
                <a href="https://business.adobe.com/products/experience-manager/adobe-experience-manager.html" target="_blank">business.adobe.com</a>
            </>
        ),
    },
    {
        title: 'Webdeveloper and Admin',
        // Svg: require('../../static/images/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                First Class Performance GmbH
                <br/>
                <a href="https://first-class-performance.com" target="_blank">first-class-performance.com</a>
            </>
        ),
    },
];

function Feature({Svg, title, description, link}) {
    return (
        <div className={clsx('col col--4')} style={{
            marginTop: '5em'
        }}>
            <div className="text--center">
                {Svg &&
                    <Svg className={styles.featureSvg} alt={title}/>
                }
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
