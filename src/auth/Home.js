import React from 'react'
import Nav from '../components/nav/Nav'
import Footer from '../components/footer/Footer'

const Home = () => {
    return (
        <>
            <table style={{ width: '100%', height: '100vh', background: 'rgba(0, 135, 61, 0.51)' }}>
                <tbody>
                    <tr>
                        <td>
                            <Nav />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <div className='row justify-content-center align-items-center m-1' style={{ minHeight: 'calc(100vh - 56px)' }}>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Footer />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Home