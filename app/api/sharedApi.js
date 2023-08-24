import { GetToken } from '../utils/helper'

export const baseUrl = "https://pawtai.stackcru.website";
export let header = async () => ({

	"Content-Type": "application/json",
	"Authorization": "Bearer " + await GetToken(),
	"Access-Control-Allow-Origin": "*"
});

export let authHeader = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*"
}
