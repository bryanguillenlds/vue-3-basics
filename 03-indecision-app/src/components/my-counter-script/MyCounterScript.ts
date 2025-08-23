import { defineComponent } from 'vue';
import { useCounter } from '../../composables/useCounter';

export default defineComponent({
	props: {
		value: {
			type: Number,
			required: true
		}
	},

	// Have to pass props to the setup function
	setup(props) {
		const { count, squaredCount } = useCounter(props.value);

		return {
			count,
			squaredCount
		};
	}
});
