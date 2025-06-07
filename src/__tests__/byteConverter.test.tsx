import React from 'react';
import { render, screen } from '@testing-library/react';
import ByteConverter from '../byteConverter';

describe('ByteConverter', () => {
  it('renders with default props (bytes to MB)', () => {
    render(<ByteConverter>1048576</ByteConverter>); // 1 MB in bytes
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('converts KB to MB with suffix', () => {
    render(
      <ByteConverter suffix inUnit="KB" outUnit="MB">
        1024
      </ByteConverter>
    );
    expect(screen.getByText('1 MB')).toBeInTheDocument();
  });

  it('adds commas when addCommas is true', () => {
    render(
      <ByteConverter addCommas inUnit="B" outUnit="B">
        {1000000}
      </ByteConverter>
    );
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('uses SI units when useSI is true', () => {
    render(
      <ByteConverter inUnit="KB" outUnit="MB" useSI>
        1000
      </ByteConverter>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders warning for invalid input unless hideWarnings is true', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ByteConverter>-1</ByteConverter>);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not warn for invalid input if hideWarnings is true', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ByteConverter hideWarnings={true}>-1</ByteConverter>);
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('renders original children for invalid input', () => {
    render(<ByteConverter>-1</ByteConverter>);
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('handles string children', () => {
    render(<ByteConverter>2048</ByteConverter>);
    expect(screen.queryByText('0.002')).not.toBeInTheDocument(); // Should not render this value
    expect(screen.getByText('0')).toBeInTheDocument(); // Should render '0' for 2048 bytes to MB
  });
});
