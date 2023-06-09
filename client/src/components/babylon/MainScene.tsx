import { Engine, Scene } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { RouletteAnimate } from './RouletteAnimate';
import { Ground } from './Ground';
import { gameStore } from '../../store/gameStore';
import { GameLoop } from '../../types';

export const MainScene = () => {
	const message = gameStore.msg;
	const RADIUS = 7;
	const assetCorrection = 0;
	const initialBallPos: [number, number, number] = [
		RADIUS,
		assetCorrection,
		-2,
	];
	const [rpm, setRpm] = useState(1);
	const [winSpin, setWinSpin] = useState(0);
	const [acc, setAcc] = useState(false);
	const [pos, setPos] = useState(initialBallPos);

	const accelerate = useCallback(() => {
		setAcc(true);
		const rpmAccInterval = setInterval(() => {
            setRpm((prevValue) => (prevValue += 10));
            	setPos((prevValue) => [
					prevValue[0] + 0.40,
					prevValue[1],
					prevValue[2] - .16,
				]);
		}, 500);

		setTimeout(() => {
			clearInterval(rpmAccInterval);
		}, 3000);
	}, []);

	const deccelerate = useCallback(() => {
		const rpmDecInterval = setInterval(() => {
			setRpm((prevValue) => (prevValue -= 6.5));
			setPos((prevValue) => [
				prevValue[0] - 0.26,
				prevValue[1],
				prevValue[2] + .10,
			]);
		}, 550);

		setTimeout(() => {
			setWinSpin(-gameStore.winSpin.winSpin);
			setAcc(false);
			clearInterval(rpmDecInterval);
		}, 5000);
	}, []);

	useEffect(() => {
		if (message) {
			if (message.gameStage === GameLoop.EMPTY_BOARD) {
				setPos(initialBallPos);
			}
			if (message.gameStage === GameLoop.NO_MORE_BETS) {
				setTimeout(() => {
					accelerate();
				}, 3000);
				setTimeout(() => {
					deccelerate();
				}, 6000);
			}
		}
		// eslint-disable-next-line
	}, [message]);

	return (
		<Engine antialias adaptToDeviceRatio canvasId='babylon-canvas'>
			<Scene>
				<hemisphericLight
					name='light1'
					intensity={0.2}
					direction={Vector3.Up()}
				/>
				<freeCamera
					name='camera1'
					position={new Vector3(0, 15, 0)}
					setTarget={[Vector3.Zero()]}
				/>

				<directionalLight
					name='shadow-light'
					intensity={0.8}
					direction={
						new Vector3(
							(-10 * Math.PI) / 4,
							(-10 * Math.PI) / 4,
							-Math.PI,
						)
					}
					position={new Vector3(0, 5, 16)}
				>
					<shadowGenerator
						mapSize={1024}
						useBlurExponentialShadowMap
						blurKernel={64}
						shadowCastChildren
					>
						<Suspense fallback={null}>
							<RouletteAnimate
								rpm={rpm}
								acc={acc}
								pos={pos}
								winSpin={winSpin}
							/>
						</Suspense>
					</shadowGenerator>
				</directionalLight>
				<Suspense fallback={null}>
					<Ground />
				</Suspense>
			</Scene>
		</Engine>
	);
};
