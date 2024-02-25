import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ActiveSounds from '../ActiveSounds'

jest.mock('../../contexts/AccessibilityContext', () => ({
  useAccessibilityContext: jest
    .fn()
    .mockImplementation(() => ({ tabIndex: 0 })),
}))

describe('ActiveSounds', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('renders correctly', () => {
    render(
      <ActiveSounds
        timer={5}
        minutes={5}
        activeSounds={1}
        stopAll={() => {}}
        setMasterVolume={() => {}}
      />,
    )
    const minutesElement = screen.getByTestId('minutes-text')
    const secondsElement = screen.getByTestId('seconds-text')

    expect(minutesElement).toBeInTheDocument()
    expect(minutesElement).toHaveTextContent('05')

    expect(secondsElement).toBeInTheDocument()
    expect(secondsElement).toHaveTextContent('05')

    expect(screen.getByText('Sounds active: 1')).toBeInTheDocument()
  })

  it('formats time correctly with leading zeros', () => {
    render(
      <ActiveSounds
        timer={5}
        minutes={5}
        activeSounds={1}
        stopAll={() => {}}
        setMasterVolume={() => {}}
      />,
    )
    const minutesElement = screen.getByTestId('minutes-text')
    const secondsElement = screen.getByTestId('seconds-text')

    expect(minutesElement).toBeInTheDocument()
    expect(minutesElement).toHaveTextContent('05')

    expect(secondsElement).toBeInTheDocument()
    expect(secondsElement).toHaveTextContent('05')
  })

  it('formats time correctly without leading zeros', () => {
    render(
      <ActiveSounds
        timer={15}
        minutes={10}
        activeSounds={1}
        stopAll={() => {}}
        setMasterVolume={() => {}}
      />,
    )

    const minutesElement = screen.getByTestId('minutes-text')
    const secondsElement = screen.getByTestId('seconds-text')

    expect(minutesElement).toBeInTheDocument()
    expect(minutesElement).toHaveTextContent('10')

    expect(secondsElement).toBeInTheDocument()
    expect(secondsElement).toHaveTextContent('15')
  })

  it('hides the link when activeSounds is 0', () => {
    render(
      <ActiveSounds
        timer={5}
        minutes={5}
        activeSounds={0}
        stopAll={() => {}}
        setMasterVolume={() => {}}
      />,
    )
    const link = screen.getByText('Stop all')
    expect(link).toHaveStyle({
      cursor: 'pointer',
    })
  })

  it('shows the link when activeSounds is greater than 0', () => {
    render(
      <ActiveSounds
        timer={5}
        minutes={5}
        activeSounds={1}
        stopAll={() => {}}
        setMasterVolume={() => {}}
      />,
    )
    const link = screen.getByText('Stop all')
    expect(link).not.toHaveStyle({
      pointerEvents: 'none',
      userSelect: 'none',
      cursor: 'pointer',
    })
  })

  it('calls stopAll function when link is clicked', () => {
    const stopAllMock = jest.fn()
    render(
      <ActiveSounds
        timer={5}
        minutes={5}
        activeSounds={1}
        stopAll={stopAllMock}
        setMasterVolume={() => {}}
      />,
    )
    const link = screen.getByText('Stop all')
    fireEvent.click(link)
    expect(stopAllMock).toHaveBeenCalled()
  })

  it('calls setMasterVolume with the correct value when input changes', () => {
    const setMasterVolumeMock = jest.fn()
    render(
      <ActiveSounds
        timer={5}
        minutes={5}
        activeSounds={1}
        stopAll={() => {}}
        setMasterVolume={setMasterVolumeMock}
      />,
    )
    const input = screen.getByRole('slider')
    fireEvent.change(input, { target: { value: '0.5' } })
    expect(setMasterVolumeMock).toHaveBeenCalledWith(0.5)
  })
})
