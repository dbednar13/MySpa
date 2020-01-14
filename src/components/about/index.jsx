import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import AboutUs from './aboutUs';
import Contact from './contact';
import FAQ from './faq';

const About = () => (
  <Tabs defaultActiveKey='about' id='about-tabs'>
    <Tab eventKey='about' title='About'>
      <AboutUs />
    </Tab>
    <Tab eventKey='faq' title='FAQ'>
      <FAQ />
    </Tab>
    <Tab eventKey='contact' title='Contact'>
      <Contact />
    </Tab>
  </Tabs>
);

export default About;
