<div class='superpope'></div>

<style>
    div {
		--w: 20vw;
		position: absolute;
		top: 0;
		left: 0;
		animation: superpope 4s linear 20s infinite both;
	}

    @media all and (min-width: 400px) {
        div {
            --w: 10vw;
        }
    }

    div::after {
        content: '';
        display: block;
        width: var(--w);
		height: calc(var(--w) * 40 / 144);
		background: url('/superpope.png') no-repeat center center;
		background-size: 100%;
		z-index: 2;

        animation: wobble 2s ease-in-out 0s infinite both;
    }

	@keyframes superpope{
		0% {
			transform: translate(calc(100vw + 100%), 2rem);
		}
		
		100% {
			transform: translate(-100%, 2rem);
		}
		
	}

    @keyframes wobble {
 0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(0, -1rem);
  }
  50% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(0, 1rem);
  }
  100% {
    transform: translate(0, 0);
 }
    }
</style>