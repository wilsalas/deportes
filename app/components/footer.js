import React, { useState } from 'react';
import { Button, Icon, Footer, FooterTab } from 'native-base';
import styles from '../styles/styles';

export default props => {

    const [getRoutes] = useState([
        "Home",
        "Football",
        "Basketball",
        "Cash",
        "Person"
    ]);

    const funRenderButtons = () => (
        getRoutes.map(item => (
            <Button key={item} onPress={() => props.navigation.navigate(item)}>
                <Icon name={item.toLowerCase()} style={styles.iconWhite} />
            </Button>
        ))
    )

    return (
        <Footer>
            <FooterTab style={styles.footerTab}>
                {funRenderButtons()}
            </FooterTab>
        </Footer>
    )
}