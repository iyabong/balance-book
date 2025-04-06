import supabase from '../supabase';

// Loan 하나 추가(대출 or 수금)
export async function insertLoan({ name, amount }) {
    const {data, error} = await supabase
                                .from('loans')
                                .insert([{name, amount}]);

    if (error){
        console.error('insertLoan error:', error);
    }

    return data;
}

// 전체 loan 목록 불러오기
export async function fetchLoans() {
    const {data, error} = await supabase 
                                .from('loans')
                                .select('*')
                                .order('created_at', {ascending: false});
    if (error){
        console.error('fetchLoans error:', error);
        throw error;
    }

    return data;
}