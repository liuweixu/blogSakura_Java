interface WaveAnimationProps {
  zIndex: string;
  opacity?: number;
  imageUrl: string;
  waveWidth: string;
  waveHeight: string;
  animationDuration?: string;
}

export const WaveAnimation = ({
  zIndex,
  opacity,
  imageUrl,
  waveWidth,
  waveHeight,
  animationDuration,
}: WaveAnimationProps) => {
  return (
    <div
      className={`absolute w-full overflow-hidden h-full bottom-[-1px] ${zIndex} ${
        opacity ? `opacity-${opacity}` : ""
      }`}
    >
      <div
        className="w-[200%] h-full bg-repeat-x bg-left-bottom origin-[center_bottom]"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: `${waveWidth} ${waveHeight}`,
          ...(animationDuration && {
            animation: `move_wave ${animationDuration}`,
          }),
        }}
      />
    </div>
  );
};
