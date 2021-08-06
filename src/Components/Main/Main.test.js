import { render, screen } from '@testing-library/react'
import Main from './main'

describe('Test suite for main', () => {
    render(<Main />)

    it('Main component render in DOM', () => {
        expect(screen.getByTestId('main_comp'))
    })
});
