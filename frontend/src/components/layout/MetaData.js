import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - HappyFruits`}</title>
        </Helmet>
    )
}

export default MetaData
// Add Custom Title
